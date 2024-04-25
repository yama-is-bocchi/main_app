export const editvalidation_check = ( input_str:String)=>{
    
    if(input_str.length<=4){
        return(1)

    }
    const sample=input_str;
    const num_regex =/[0-9]/g;
    const num_result = sample.search(num_regex);
    const eng_regex =/[a-z,A-Z]/g;
    const eng_result = sample.search(eng_regex);
    
    if(eng_result>=0){
        if(num_result>=0){
            return(0 );

        }else{
            return(1);
        }
    }else{
        return(1);
    }
};