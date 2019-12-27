
export function GenerateRandonCode(Length){

    let Array= [];
    for(let a=0; a<=Length;a+=1){
        let Number= Math.floor(Math.random() *10);
        Array.push(Number);
    }

    return Array.join('');
}