
function selectId(val, array) {
    return array.find(object=>{
        return object.id === val
    })    
}

export default selectId;