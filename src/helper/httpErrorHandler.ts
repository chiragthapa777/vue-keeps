const HttpErrorHandler = (error:any) =>{
    try{
        return error.response.data.message
    }catch (e) {
        return "Some error occurred."
    }
}
export default HttpErrorHandler;
