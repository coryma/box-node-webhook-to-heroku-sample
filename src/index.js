/**
 * This sample shows how to connect a Box webhook to a Heroku app.
 */

'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import BoxSDK from 'box-node-sdk'

const PORT = process.env.PORT || 3000

//Initialize Box SDK
const sdk = new BoxSDK({
	clientID: process.env.BOX_CLIENT_ID,
	clientSecret: process.env.BOX_CLIENT_SECRET,
	appAuth: {
		keyID: process.env.BOX_APPAUTH_KEY_ID,
		privateKey:  process.env.BOX_APPAUTH_PRIVATE_KEY,
		passphrase: process.env.BOX_PASSPHRASE
	}
});

express()
	.use(bodyParser.json())
	.post('/get-box-file', (req, res) => handler(req, res))
	.listen(PORT, () => console.log(`Listening on ${PORT}`))

/**
 * The handler validates the request body using the signing keys to ensure that the message
 * was sent from your Box application before calling handleWebhookEvent().
 */
function handler(req, res) {
	let body = stringifyBody(req.body)
	let isValid = BoxSDK.validateWebhookMessage(body, req.headers,
		process.env.BOX_WEBHOOKS_PRIMARY_KEY, process.env.BOX_WEBHOOKS_SECONDARY_KEY)
	if (isValid) {
		// Handle the webhook event
		const response = handleWebhookEvent(JSON.parse(body))
		res.status(response.statusCode).send(response.message)
	} else {
		res.status(403).send('Message authenticity not verified')
	}
}

/**
 *  The sample function logs details of the webhook event to Heroku log.f the analysis.
 */
function handleWebhookEvent(webhookEvent) {
	// Print basic information about the Box event
	let message = `webhook=${webhookEvent.webhook.id}`

	// The event trigger: FILE.DOWNLOADED, FILE.UPLOADED, etc.
	message += `, trigger=${webhookEvent.trigger}`

	// The source that triggered the event: a file, folder, etc.
	if (webhookEvent.source) {
		const source = webhookEvent.source
        message += `, source=<${source.type} id=${source.id} name=${source.name || 'unknown'}>`
    }
    console.log(`Box event: ${message}`)
    return { statusCode: 200, body: message }
}

/**
 *  Stringify the request body from 'object' to 'string'. 
 *  Fix the issue that Box validateWebhookMessage method cannot handle Chinese 
 *  and other none-ASCII characters correctly.
 */
function stringifyBody(obj) {
	var str = JSON.stringify(obj)
	str = str.replace(/\"name\":\"(.*?)\"/g, (match, str) => {
		str = "\"" + str.replace(/([^\u0000-\u007F])/g, (match, str) => {
			return escape(str).replace(/%u/g, "\\u").toLowerCase()
		}) + "\""
		return `"name":${str}`
	})
	return str
}