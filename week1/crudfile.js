const fs=require('fs');

//Writing data to Employee.js file
//If Employee.json file doesn't exists, it creates a file with the 'Employee' name
const writeEmployees=(data)=>{ 
    return new Promise((resolve,reject)=>{
        try{
            fs.writeFile('employee.json',JSON.stringify(data),err=>{
                if(err){throw err}
            })
            resolve('Writing is done.');
        }
        catch(err){
            reject('Failed writing.'+err);
        }
    })
}

//Reading data from Employee.js file
const readEmployees=()=>{
    return new Promise((resolve,reject)=>{
        try{
            fs.readFile('employee.json',(err,data)=>{
                if(err){throw err}
                else{
                    let parseddata=JSON.parse(data);
                    resolve(parseddata);
                    console.log(data);
                    console.log(parseddata);
                }
            })
        }
        catch(err){
            reject('Failed reading.')
        }
    })
}

//Updating data in the Employee.json file
const updateEmployees=(newname,newsalary)=>{
    return new Promise((resolve,reject)=>{
        try{
            let data=fs.readFileSync('employee.json');
            let parsed=JSON.parse(data);
            console.log(parsed);
            parsed.name=newname;
            parsed.salary=newsalary;  
            fs.writeFileSync('employee.json',JSON.stringify(parsed));
            resolve();       
        }
        catch(err){
            reject(err);
        }
    })
}

//Deleting the Employee.json file
const deleteEmployees=()=>{
    return new Promise((resolve,reject)=>{
        try{
            fs.unlink('employee.json',err=>{
                if(err){throw err;}
            })
            resolve('File is deleted.')
        }
        catch(err){
            reject(err);
        }
    })
}


//Running all the functions in here
async function allof(){
    try{
        let data={name: "Employee 5 Name", salary: 2000};
        let newname="Employee 6 Name";
        let newsalary=7000;
        //await writeEmployees(data);
        //await readEmployees();
        await updateEmployees(newname,newsalary);
        //await deleteEmployees();
    }
    catch(err){
        throw err;
    }
    
}


allof();