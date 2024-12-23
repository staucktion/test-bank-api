# Test Bank API

## 🔬 Automation Testing

* Launch bank-api

Modify `.env` file for configurations.

Install dependencies

```
npm i
```

Run parallel tests and clean database

```
npm run test:parallel:clean
```

Run parallel tests

```
npm run test:parallel
```

Run sequential tests

```
npm run test
```

Run spec tests in parallel

```
npm run spec:parallel
```

Run spec tests in sequential

```
npm run spec
```

<br/>

## 🐛 Test Report

Mochawesome is integrated into the project to generate comprehensive test reports. The reports provide detailed insights into test execution, including the results of individual tests, their durations, and any issues encountered.

After running the tests, you can view the generated report at `/mochawesome-report/mochawesome.html`. This report is automatically generated upon test completion.

<br/>

## 🔬 Manual Testing

To run the Postman tests, first import the Postman collection file from the path `./postman-request` into Postman by selecting the `Import` option. After importing, locate the collection in Postman, execute the individual requests for each. Review the responses to ensure that the endpoints are functioning as expected.

<br/>