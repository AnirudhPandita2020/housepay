package com.service.housepay.models;

import com.service.housepay.enums.TransactionType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "ledgers", schema = "public", indexes = {
        @Index(name = "idx_resident_flat_no_ledgers", columnList = "resident_flat_no")
})
public class Ledger {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resident_flat_no", nullable = false)
    private Resident residentFlatNo;

    @NotNull
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @ColumnDefault("now()")
    @Column(name = "created_at")
    private Instant createdAt;

    @NotNull
    @Column(name = "transaction_id", nullable = false, length = Integer.MAX_VALUE)
    private String transactionId;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @ColumnDefault("'UPI'")
    @Column(name = "transaction_type", columnDefinition = "transaction_type not null")
    private TransactionType transactionType;

}