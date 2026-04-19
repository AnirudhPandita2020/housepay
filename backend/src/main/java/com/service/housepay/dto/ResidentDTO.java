package com.service.housepay.dto;

import com.service.housepay.enums.ResidentType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ResidentDTO {

    @NotBlank(message = "Flat number is required")
    private String flatNo;

    @NotBlank(message = "Resident name is required")
    private String residentName;

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotNull(message = "Square footage is required")
    private Integer sqft;

    private String ownerName;
    private String ownerMobile;

    @Email(message = "Owner email must be valid")
    private String ownerEmail;

    private BigDecimal additionalPayments;

    private ResidentType type;
}

