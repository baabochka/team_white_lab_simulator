package com.white.lab_sim.market.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

public abstract class MarketUnit {

    @Id
    private Long id;

    private User createdBy;

    private Set<User> savedBy;

    private boolean if_public;

    @Transient
    private AtomicInteger incrementor = new AtomicInteger(0);
    public MarketUnit() {
        id = (long)(incrementor.incrementAndGet());
    }
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Set<User> getSavedBy() {
        return savedBy;
    }

    public void setSavedBy(Set<User> savedBy) {
        this.savedBy = savedBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<User> getSaved_by() {
        return savedBy;
    }

    public void setSaved_by(Set<User> saved_by) {
        this.savedBy = saved_by;
    }

    public boolean isIf_public() {
        return if_public;
    }

    public void setIf_public(boolean if_public) {
        this.if_public = if_public;
    }

}
