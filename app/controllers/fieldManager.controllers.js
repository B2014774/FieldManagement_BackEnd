const {FieldManager} = require("../model/model");

const FieldManagerController = {
    addFieldManager: async (req,res) => {
        try{
            const newManager = new FieldManager(req.body);
            const savedManager = await newManager.save();
            res.status(200).json(savedManager);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllManagers: async (req,res) => {
        try {
            const managers = await FieldManager.find();
            res.status(200).json(managers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAnManager: async (req,res) => {
        const manager = await FieldManager.findById(req.params.id);
        res.status(200).json(manager);
    },

    deleteAManager: async (req,res) => {
        try {
            await FieldManager.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted a Manager");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = FieldManagerController;