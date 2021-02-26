import  { useEffect, useRef, useState } from 'react';

const useDidMountEffect:(func:()=>void,deps:Array<any>)=>void = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

const useForceUpdate:()=>()=>void=()=>{
    const [value, setValue] = useState(0);
    const svalue=value+1;
    return () => setValue(svalue);
}

export {useDidMountEffect,useForceUpdate};