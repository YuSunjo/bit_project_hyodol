const models = require('../../models');

//조회
exports.findAllCustomer = (req, res, next) => {
    try {
        models.twiliouser.findAll({
        }).then( (customers) => {
            res.render('customer/customer.html', { customers: customers })
        })
    }catch(error) {
        next(error);
    }
};

//생성
exports.writeCustomer = async(req, res, next) => {
    console.log(req.body)
    try{
        await models.twiliouser.create(req.body);
        console.log(req.body);
        res.redirect('/customer')
    }catch(error){
        next(error);
    }
}

//수정
exports.updateCustomer = async (req, res, next) => {
    try{
        models.twiliouser.update({
            name: req.body.name,
            phone: req.body.phone
        },{
            where : {id : req.params.id}
        }).then( () => {
            res.redirect('/customer/detail/' + req.params.id);
        })
    }catch(error){
        next(error);
    }
}

//삭제
exports.deleteCustomer = async (req, res, next) => {
    try{
        models.twiliouser.destroy({
            where : {
                id: req.params.id
            }
        }).then(() => {
            res.redirect('/customer');
        })
    }catch(error){
        next(error);
    }
}

exports.findByPk = (req, res, next) => {
    try{
        models.twiliouser.findByPk(req.params.id).then( (customer) => {
            res.render('customer/write.html', { customer });
        })
    }catch(error){
        next(error);
    }
}