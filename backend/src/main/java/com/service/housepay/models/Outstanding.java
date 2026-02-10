package com.service.housepay.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "outstandings", schema = "public", indexes = {
        @Index(name = "idx_resident_flat_no_outstandings", columnList = "resident_flat_no")
})
public class Outstanding {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resident_flat_no", nullable = false)
    private Resident residentFlatNo;

    @NotNull
    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Column(name = "comment", length = Integer.MAX_VALUE)
    private String comment;

}