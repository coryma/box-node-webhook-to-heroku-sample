# box-node-webhook-to-heroku-sample

This sample shows how to connect a [Box webhook](https://github.com/box/box-node-sdk/blob/master/docs/webhooks.md) to a Heroku app.


## Getting Started

These instructions will get you a copy of the project up and running on Heroku for Box webhook app development and testing purposes. See deployment for notes on how to deploy the project on Heroku.

### Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Box Developer Account](https://developer.box.com/)

### Configuration
#### Box Platform Configuration
##### Step 1. Create a Box application
1. Log into the [Box Developer Console](https://developer.box.com)
    * Switch to the open beta of the new Developer Console
2. Select "Create New App"
    * Select "Custom App" and press "Next"
    * Select "OAuth 2.0 with JWT (Server Authentication)" and press "Next"
    * Name the application "Box Webhook App - YOUR NAME"
        * *Application names must be unique across Box*
    * Press "Create App" and then "View Your App"
3. In the "CORS Allowed Origins" section, add `http://localhost:3000`.
4. Click "Save Changes".
### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
