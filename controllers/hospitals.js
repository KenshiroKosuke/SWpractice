//@access public
export function getHospitals(req, res, next) {
    res.status(200).json({success:true,msg:'Show all hospital'});
}
//@access public
export function getHospital(req, res, next) {
    res.status(200).json({succes:true, msg:`Show hospital ${req.params.id}`});
}
//@access private
export function createHospital(req, res, next) {
    res.status(200).json({success:true, msg:'Create new hospitals'})
}
//@access private
export function updateHospital(req, res, next) {
    res.status(200).json({success:true, msg:`Update hospital id: ${req.params.id}`})
}
//@access private
export function deleteHospital(req, res, next) {
    res.status(200).json({success:true, msg:`Delete hospital id: ${req.params.id}`})
}