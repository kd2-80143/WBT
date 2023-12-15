import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {  useEffect, useState } from "react";


function Dashboard() {
    const url = "http://127.0.0.1:5001/product";
    const [prod, setprod] = useState([]);
    const [pdt,setpdt] = useState({productid : 0, producttitle : "", price : "",stock : ""});
   
    const fetchRecords = () => {
    axios.get(url).then((result)=>
    {
        setprod(result.data)
    })   
    }

    const OnTextChange = (args) => {
        
        var copyofProduct = {...pdt};
        copyofProduct[args.target.name] = args.target.value;
        setpdt(copyofProduct);
        //console.log(copyofProduct);
        
    }

    const AddRecord = () => {
        axios.post(url,pdt).then((result)=>{
            if(result.data.affectedRows !== undefined && result.data.affectedRows > 0)
            {
                fetchRecords();
                Reset();
            }
        });
    }

    

    const Reset = () => {
        setpdt({producttitle : "", price : "",stock : ""})
    }

    useEffect(()=> {
        fetchRecords();
    },[])

    const EditRecord = (id) => {
        for(var i = 0; i < prod.length ; i++)
        {
            if(prod[i].productid === id)
            {
                var prodToEdit = {...prod[i]};
                setpdt(prodToEdit);
                break;
            }
        }
    }

    const UpdateRecord = () => {
        var updateURL = url + "/" + pdt.productid;
        axios.put(updateURL,pdt).then((result)=>{
            if(result.data.affectedRows !== undefined && result.data.affectedRows > 0)
            {
                fetchRecords();
                Reset();
            }
        })
    }

    const DeleteRecord = (id) => {
        console.log(id);
        var deleteURL = url + "/" + id;
        axios.delete(deleteURL).then((result)=>{
            if(result.data.affectedRows !== undefined && result.data.affectedRows > 0)
            {
                fetchRecords();
            }
        })

    }

    
   
    return ( <>
    

      
            <div className="container">

                <div className="table table-responsive">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Product Title</td>
                                <td><input type="text" name='producttitle' value={pdt.producttitle} onChange={OnTextChange}></input></td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><input type="number" name='price' value={pdt.price} onChange={OnTextChange}></input></td>
                            </tr>
                            <tr>
                                <td>Stock</td>
                                <td><input type="number" name='stock' value={pdt.stock} onChange={OnTextChange}></input></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className="btn btn-success" onClick={AddRecord}>
                                        Add Record
                                    </button> {" "}
                                    <button className="btn btn-warning" onClick={UpdateRecord}>
                                       Update
                                    </button> {" "}
                                    <button className="btn btn-info" onClick={Reset}>
                                        Reset
                                    </button>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <hr></hr>
                <hr></hr>

                <div className="table table-responsive">
                  

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                prod.map((pdt)=>{
                                    return (<tr key={pdt.productid}>
                                                <td>{pdt.productid}</td>
                                                <td>{pdt.producttitle}</td>
                                                <td>{pdt.price}</td>
                                                <td>{pdt.stock}</td>
                                                <td><button className="btn btn-warning"
                                                    onClick={()=>{
                                                        EditRecord(pdt.productid)
                                                    }}>
                                                    Edit
                                                    </button>
                                                </td>
                                                <td><button className="btn btn-danger"
                                                     onClick={()=>{
                                                         DeleteRecord(pdt.productid)
                                                     }}>
                                                     Delete
                                                </button>

                                                </td>
                                            </tr>)
                                })
                            }

                        </tbody>
                    </table>

                </div>

            </div>
            </> );

}

export default Dashboard;