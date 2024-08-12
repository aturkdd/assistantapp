

### "dev": "nodemon --inspect -r dotenv/config src/server.js"

--inspect:

The --inspect flag enables the Node.js Inspector, allowing you to debug your Node.js application using a debugger such as Chrome DevTools or Visual Studio Code.
-r dotenv/config:

The -r flag is used to preload a module before the application code is executed. In this case, it preloads the dotenv/config module, which is commonly used to load environment variables from a .env file into process.env.


##     app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: false,
      parameterLimit: 50000,
    })
  );

The application/x-www-form-urlencoded is a default content type used in HTML forms for submitting data. When a form is submitted with the "application/x-www-form-urlencoded" content type, the form data is URL-encoded before being sent in the body of the HTTP request.

Here's a brief explanation of URL encoding:

Form Data Encoding:

When a user submits a form on a website, the form data is traditionally sent to the server in the body of the HTTP request. Each field and its corresponding value are encoded as key-value pairs.
URL Encoding:

URL encoding is a mechanism for representing special characters in a URL. In the context of form submissions, it is used to encode spaces and special characters in the form data.
Key-Value Pairs:

Each key-value pair is separated by an equal sign (=), and different pairs are separated by an ampersand (&). For example, name=John&age=25 represents two key-value pairs: "name" with the value "John" and "age" with the value "25".
Content-Type Header:

The "application/x-www-form-urlencoded" content type is specified in the Content-Type header of the HTTP request to indicate that the data in the request body is URL-encoded.