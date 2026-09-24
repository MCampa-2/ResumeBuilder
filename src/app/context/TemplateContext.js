"use client";
import { useState, useContext,createContext, useEffect } from "react";

export const TemplateContext = createContext();


export default function TemplateProvider({children}){

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() =>{
        const savedTemplate = localStorage.getItem("template");
        if(savedTemplate){
            setSelectedTemplate(savedTemplate);
        }
    },[]);
   

    return(
        <TemplateContext.Provider value={{selectedTemplate, setSelectedTemplate}}>
            {children}
        </TemplateContext.Provider>
    )
}