const Service = require("../models/service")

// --ADD--SERVICE--

exports.Service = async (req, res) => {
    try {
        const serviceImage = req.file ? req.file.filename : null;
        const service = new Service(req.body)
        service.admin = req.admin._id
        service.image = req.files['serviceimage'][0].filename,
            service.includeservices = {
                title: req.body.title,
                image: req.files['includeserviceimage'][0].filename,
                description: req.body.description,
            };
        service.save()
        return res.status(200).json({ msg: "service provider details" })
    } catch (error) {
        comsole.log(error)
        return res.status(400).json({msg:"something went wrong"})
    }
}

// --GET--SERVICE--PROVIDER

exports.getservice = async (req, res) => {
    try {
        const getservice = await Service.find({}).populate("subcategory", "name")
        return res.status(200).json({ msg: "service provider get successfully", getservice })
    } catch (error) {
        return res.status(4000).json({ msg: "something went wrong" })
    }
}

// ---UPDATE--SERVICE--PROVIDER-DETAIL

exports.updateservice = async (req, res) => {
    try {
        const { jobs, rate, rating, name, details, description, } = req.body;
        const serviceImage = req.file ? req.path.filename : null;
        const updateservice = await Service.findByIdAndUpdate(req.params.id, {
            jobs,
            rate,
            rating,
            name,
            details,
            description,
            Image: serviceImage
        })
        return res.status(200).json({ msg: "service-provider update successfulley", updateservice })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ---DELETE---SERVICE---PROVIDER---DETAILS

exports.deleteservice = async (req, res) => {
    try {
        const deleteservice = await Service.deleteOne({ admin: req.admin._id })
        return res.status(200).json({ msg: "service provider delete successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// ----GET----SINGLE----SERVICE----PROVIDER


exports.getsingleservice = async (req, res) => {
    try {
        const getservice = await Service.findById({ _id: req.params.id }).populate("subcategory", "name")
        return res.status(200).json({ msg: "service provider get successfully", getservice })
    } catch (error) {
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// change status favroite to un favroite

exports.addFavroite = async (req, res,) => {
    try {
      const service = await Service.findById(req.params.id);
  
  
      if (service.status == "pending") {
        service.status = "favroite"
  
      } else if (service.status == "favroite") {
        service.status = "pending"
      }
  
      await service.save()
  
      return res.status(200).json({ msg: `status changed to ${service.status}` });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  };

//   GET_ALL_FAV_SERVICE_PROVIDER

exports.getfav=async (req,res)=>{
    try {
        const getfav=await Service.find({status:"favroite"})
        return res.status(200).json({msg:"booking getted",getfav})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})  
    }
}