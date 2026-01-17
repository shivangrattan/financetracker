package com.shivang.financetracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    
    @Column(nullable = false)
    private String category;
    
    @Column(length = 500)
    private String description;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
    }
}
