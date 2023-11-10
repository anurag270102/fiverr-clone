import React, { useReducer, useState } from "react";
import './add.scss';
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from '../../utils/upload.js';
import { useQueryClient,useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Add = () => {
    const [singleFile, setsingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const handlechange = (e) => {
        dispatch({
            type: "CHANGE_INPUT", payload: {
                name: e.target.name, value: e.target.value
            }
        })
    }
    const handlefeature = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE", payload: e.target[0].value,
        });
        e.target.value = ''
    }
    const handleupload = async () => {
        setUploading(true);
        try {
            const cover = await upload(singleFile);

            const images = await Promise.all(
                [...files].map(async file => {
                    const url = await upload(file);
                    return url;
                })
            );
            setUploading(false);
            dispatch({
                type: "ADD_IMAGES", payload: {
                    cover, images
                }
            })
        } catch (error) {
            console.log(error);
        }
    };
    const navigate=useNavigate();
    const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["myGigs"])
    }
  });
    const handlesubmit=(e)=>{
        e.preventDefault();
        mutation.mutate(state);
        navigate('/mygigs')
    }
    return ([
        <div className="add">
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Title</label>
                        <input type="text"
                            name="title"
                            id=""
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handlechange}
                        />
                        <select name="cat" id="cat" onChange={handlechange}>
                            <option value="Design">Design</option>
                            <option value="Web developer">Web Developer</option>
                            <option value="Animation">Animation</option>
                            <option value="Music">Music</option>
                        </select>
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="">Cover Image</label>
                                <input type="file" name="" id="" onChange={e => setsingleFile(e.target.files[0])} />
                                <label htmlFor="">Upload Images</label>
                                <input type="file" name="" id="" multiple onChange={e => setFiles(e.target.files)} />
                            </div>
                        </div>
                        <button onClick={handleupload}>{uploading ? "uploading" : "Upload"}</button>
                        <label htmlFor="">Description</label>
                        <textarea
                            name="desc"
                            id=""
                            cols="30"
                            rows="16"
                            placeholder="A brief description to introduce your service to cusmoters"
                            onChange={handlechange}
                        ></textarea>
                        <button onClick={handlesubmit}>Create</button>
                    </div>
                    <div className="right">
                        <label htmlFor="">Service Title</label>
                        <input
                            type="text"
                            placeholder="e.g. One-page web design"
                            name="sortTitle"
                        />
                        <label htmlFor="">Short Description</label>
                        <textarea
                            name="sortDesc"
                            onChange={handlechange}
                            id=""
                            placeholder="Short description of your service"
                            cols="30"
                            rows="10"

                        ></textarea>
                        <label htmlFor="">Delivery Time (e.g. 3 days)</label>
                        <input 
                        type="number" 
                        name="deliveryTime" 
                        min={2} 
                        onChange={handlechange} 
                        />
                        <label htmlFor="">Revision Number</label>
                        <input 
                        type="number" 
                        min={1} 
                        name="revisonNumber" 
                        onChange={handlechange} 
                        />
                        <label htmlFor="">Add Features</label>
                        <form action="" className="add" onSubmit={handlefeature}>
                            <input 
                            type="text" 
                            placeholder="e.g. page design" 
                            />
                            <button type="submit">add </button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map(f => (
                                <div className="item" key={f}>
                                    <button onClick={() => dispatch(
                                        {
                                            type: "REMOVE_FEATURE", payload: f
                                        })
                                    }>{f}
                                        <span>X</span>
                                    </button>
                                </div>))}
                        </div>
                        <label htmlFor="">Price</label>
                        <input 
                        type="number" 
                        onChange={handlechange}
                         name="price" />
                    </div>
                </div>
            </div>
        </div>
    ]);
}
export default Add;