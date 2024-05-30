

export const setFlowData=(data)=>{
    console.log('Saving data',data)
    localStorage.setItem("flow",JSON.stringify(data));
}

export const clearFlowData=()=>{
    localStorage.removeItem("flow");
}
// get Coinset 
export const getFlowData=()=>{
    const isData=localStorage.getItem("flow");
    if(!isData)
    {
        return null;
    }
    try {
        const data=JSON.parse(isData);
        return data;
    } catch (error) {
        console.error("Something went wrong:", error);
        return null;
    }
}

export const setSolArrayFormValues=(data)=>{
    console.log('Saving data',data)
    localStorage.setItem("solArrayFormValues",JSON.stringify(data));
}

export const getSolArrayFormValues=()=>{
    const isData=localStorage.getItem("solArrayFormValues");
    if(!isData)
    {
        return null;
    }
    try {
        const data=JSON.parse(isData);
        return data;
    } catch (error) {
        console.error("Something went wrong:", error);
        return null;
    }
}