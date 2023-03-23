import {connection} from "../config/vacCenterDB.js";

// constructor
export const VacCenter = function(vacCenter) {
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel =vacCenter.tel;
}

VacCenter.getAll = result => {
    connection.query("SELECT * FROM vacCenters", (err,res) => {
        if (err) {
            console.log("err: ", err)
            result(null, err)
            return;
        }
        console.log("vacCenter: ", res)
        result(null, res)
    })
}