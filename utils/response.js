

const ResponseMessage = {
    Success: "Success",
    NotFound: "Data not found",
    BadRequest: "Invalid request provided",
    InternalServerError: "An unexpected error occurred on the server",
    Unauthorized: "Unauthorized access"
};

class APIResponseServices {
    constructor(statusCode, success, message, data = null) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static successResponse(data, message = ResponseMessage.Success) {
        return new APIResponseServices(200, true, message, data);
    }

    static notFoundResponse(message = ResponseMessage.NotFound) {
        return new APIResponseServices(404, false, message, null);
    }

    static badRequestResponse(message = ResponseMessage.BadRequest) {
        return new APIResponseServices(400, false, message, null);
    }

    static errorResponse(message = ResponseMessage.InternalServerError) {
        return new APIResponseServices(500, false, message, null);
    }

    /**
     * Logic: if (data == null) ... else if (data is IEnumerable && !list.Any())
     */
    static emptyOr404(data, message = ResponseMessage.NotFound) {
        // Correctly handle null, undefined, or empty arrays (List.Any() equivalent)
        const isEmpty = !data || (Array.isArray(data) && data.length === 0);
        
        if (isEmpty) {
            return this.notFoundResponse(message);
        }

        return this.successResponse(data);
    }

    /**
     * Helper to send the response via Express res object.
     * Professional tip: This ensures we don't try to send a response twice.
     */
    static send(res, apiResponse) {
        if (res.headersSent) return; 

        return res.status(apiResponse.statusCode).json({
            statusCode: apiResponse.statusCode,
            success: apiResponse.success,
            message: apiResponse.message,
            data: apiResponse.data,
            timestamp: new Date().toISOString() // Added for professional tracking
        });
    }
}

module.exports = APIResponseServices;