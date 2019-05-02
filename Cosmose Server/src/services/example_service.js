

class ExampleService {
    constructor() {}

    doSomething() {
        return "it works";
    }
}

module.exports.ExampleService = ExampleService;
module.exports.service = new ExampleService();
