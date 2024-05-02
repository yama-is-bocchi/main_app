//エディットバリデーションチェックを行う 0=正常,1=異常
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
            return(0);

        }else{
            return(1);
        }
    }else{
        return(1);
    }
};

//指定範囲の乱数を生成する
export function get_random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  //ロードが開始
 export const loading_st = async () => {
    var element = document.getElementById("loading");
    element.style.display = "none";
  };
  //ロードが終わったら表示
  export const loading_end = async () => {
    var element = document.getElementById("loading");
    element.style.display = "";
  };