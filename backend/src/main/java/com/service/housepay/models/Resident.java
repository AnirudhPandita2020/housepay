package com.service.housepay.models;

import com.service.housepay.enums.ResidentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "residents", schema = "public")
public class Resident {
    @Id
    @Column(name = "flat_no", nullable = false, length = Integer.MAX_VALUE)
    private String flatNo;

    @NotNull
    @Column(name = "resident_name", nullable = false, length = Integer.MAX_VALUE)
    private String residentName;

    @NotNull
    @Column(name = "mobile", nullable = false, length = Integer.MAX_VALUE)
    private String mobile;

    @NotNull
    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @NotNull
    @Column(name = "sqft", nullable = false)
    private Integer sqft;

    @Column(name = "owner_name", length = Integer.MAX_VALUE)
    private String ownerName;

    @Column(name = "owner_mobile", length = Integer.MAX_VALUE)
    private String ownerMobile;

    @Column(name = "owner_email", length = Integer.MAX_VALUE)
    private String ownerEmail;

    @Column(name = "additional_payments")
    private BigDecimal additionalPayments;

    @OneToMany(mappedBy = "residentFlatNo")
    private Set<Ledger> ledgers = new LinkedHashSet<>();
    @OneToMany(mappedBy = "residentFlatNo")
    private Set<Outstanding> outstandings = new LinkedHashSet<>();

    @Column(name = "type", columnDefinition = "resident_type not null")
    @ColumnDefault("'OWNER'")
    private ResidentType type;

}