class APIFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr
    }

   

    search(){
        const keyword=this.querystr.keyword ? {
            //if keyword is found
            name:{
                //regex is regular expression
                $regex: this.querystr.keyword, 
                //case insensitive
                $options :"i"
            }
        }:{}
        //...keyword means the actual keyword which is passed not the reference of keyword
        this.query = this.query.find({...keyword})
        return this;
    }
    sort(){
        const sortby= this.querystr.sort ? {
            
            sort:{

            }
          //  sortOption === "Alphabetically, A-Z" ? {}:{}
            // const sortOptions = [
            //     "Best Selling", "Price, high to low","Price, low to high"
            // ]
        } : {
           // "Alphabetically, A-Z"
        }
    }
//     category(){
//         const category = this.querystr.category ?{

//         }:
//         { // ADD SOME MESSAGE IF USER TRIES TO ACCESS PRODUCTS WITHOUT CATEGORY}
//     }
// }
  pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }

   

}
module.exports = APIFeatures;