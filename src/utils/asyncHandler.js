//const asyncHandler = () => {}

// rapper code that can be used at multiple places



//method 2: promises then 
const asyncHandler = (requestHandler) => {
     return  (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}



    export{asyncHandler}

    // const asyncHandler = () => {}
    // const asyncHandler = (func) => {}
    // const asyncHandler = (func) =>async () => {}


        // method 1 : try catch   
    // const ayncHandler = (fn) => async(req,res,next) => {
    //      try {
    //         await fn(req, res, next)
    //      } catch (error) {
    //         res.status(err.code || 500).json({
    //             success: false,
    //             message: err.message
    //         })
            
    //      }
    // }

