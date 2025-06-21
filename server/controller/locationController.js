const Location =require('../model/locationModel');

const CreateLocation = async (req, res) => {
    try {

        const newLocation = new Location(req.body);
        await newLocation.save();
        return res.status(201).json({ message: "Location created successfully", Location: newLocation });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const GetAllLocation = async(req,res)=>{
    try {
        const {searchText=''} = req.query;
        const filter = searchText?{$or:[
                {name:{$regex:searchText,$options:'i'}}
            ]}:{};
        const all = await Location.find(filter);
        const count = await Location.countDocuments(filter);
        res.status(200).json({message:"list",data:all,count:count});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const GetLocationById = async(req,res)=>{
    try {
        const selected = await Location.findById(req.params.id);
        if(selected){
            return res.status(200).json({message:"success",data:selected});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const UpdateLocation = async(req,res)=>{
    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedLocation){
            return res.status(200).json({message:"success",data:updatedLocation});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const DeleteLocation  = async(req,res)=>{
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if(deletedLocation){
            return res.status(200).json({message:"success",data:deletedLocation});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
module.exports={
    CreateLocation,GetAllLocation,GetLocationById,UpdateLocation,DeleteLocation
};


