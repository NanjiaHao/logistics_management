package com.cyc.pojo;

import java.io.Serializable;
import java.util.Date;

public class Vehicle implements Serializable {
    private Integer id;

    private String vehicleCode;

    private String deliveryCode;

    private String employeeCode;

    private Integer vehicleStatus;

    private Byte status;

    private Date createtime;

    private Date updatetime;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVehicleCode() {
        return vehicleCode;
    }

    public void setVehicleCode(String vehicleCode) {
        this.vehicleCode = vehicleCode == null ? null : vehicleCode.trim();
    }

    public String getDeliveryCode() {
        return deliveryCode;
    }

    public void setDeliveryCode(String deliveryCode) {
        this.deliveryCode = deliveryCode == null ? null : deliveryCode.trim();
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode == null ? null : employeeCode.trim();
    }

    public Integer getVehicleStatus() {
        return vehicleStatus;
    }

    public void setVehicleStatus(Integer vehicleStatus) {
        this.vehicleStatus = vehicleStatus;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Vehicle other = (Vehicle) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getVehicleCode() == null ? other.getVehicleCode() == null : this.getVehicleCode().equals(other.getVehicleCode()))
            && (this.getDeliveryCode() == null ? other.getDeliveryCode() == null : this.getDeliveryCode().equals(other.getDeliveryCode()))
            && (this.getEmployeeCode() == null ? other.getEmployeeCode() == null : this.getEmployeeCode().equals(other.getEmployeeCode()))
            && (this.getVehicleStatus() == null ? other.getVehicleStatus() == null : this.getVehicleStatus().equals(other.getVehicleStatus()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreatetime() == null ? other.getCreatetime() == null : this.getCreatetime().equals(other.getCreatetime()))
            && (this.getUpdatetime() == null ? other.getUpdatetime() == null : this.getUpdatetime().equals(other.getUpdatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getVehicleCode() == null) ? 0 : getVehicleCode().hashCode());
        result = prime * result + ((getDeliveryCode() == null) ? 0 : getDeliveryCode().hashCode());
        result = prime * result + ((getEmployeeCode() == null) ? 0 : getEmployeeCode().hashCode());
        result = prime * result + ((getVehicleStatus() == null) ? 0 : getVehicleStatus().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreatetime() == null) ? 0 : getCreatetime().hashCode());
        result = prime * result + ((getUpdatetime() == null) ? 0 : getUpdatetime().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", vehicleCode=").append(vehicleCode);
        sb.append(", deliveryCode=").append(deliveryCode);
        sb.append(", employeeCode=").append(employeeCode);
        sb.append(", vehicleStatus=").append(vehicleStatus);
        sb.append(", status=").append(status);
        sb.append(", createtime=").append(createtime);
        sb.append(", updatetime=").append(updatetime);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}