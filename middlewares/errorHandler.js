/** Not Found Error Handler */ 

/**
 * The function `notFound` is a middleware function that handles 404 errors by creating a new error
 * object and passing it to the next middleware function.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, request URL, request headers, request body, and
 * other relevant data.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send a response
 * back to the client. In this case, it is used to set the status code of the response to 404 (Not
 * Found) and pass the error object to the next middleware function.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to invoke the next middleware function
 * in the chain. In this case, it is used to pass the error to the next middleware function.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found : ${req.originalUrl}`)
    res.status(404)
    next(error);
};


/** Error Handler  */

/**
 * The `handleError` function is a middleware function in JavaScript that handles errors by setting the
 * status code and sending a JSON response with the error message and stack trace.
 * @param err - The `err` parameter is the error object that is passed to the error handling
 * middleware. It contains information about the error that occurred, such as the error message and
 * stack trace.
 * @param req - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as the request headers, request method, request URL, request body,
 * etc.
 * @param res - The `res` parameter is the response object in Express.js. It represents the HTTP
 * response that will be sent back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when an error occurs and you want to
 * skip the current middleware and move on to the error handling middleware.
 */
const handleError = (err, req, res, next) => {
    const statuscode = res.statuscode  ? res.statusCode : 500;
    res.status(statuscode);
    res.json({
        status: false,
        message:err?.message,
        stack: err?.stack
    });
}

module.exports = {notFound, handleError}