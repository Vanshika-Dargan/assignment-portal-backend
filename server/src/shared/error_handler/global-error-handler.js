export default (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    
    const stackLines = error.stack.split('\n');
    return res.status(statusCode).json({
      error:{
        code: statusCode,
        message: error.message,
        stackTrace: stackLines
      },
    });
  };
  
