package com.white.lab_sim.market.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import java.util.Set;

public abstract class MarketUnit {


    private String id;
    private User createdBy;

    private Set<User> savedBy;

    private boolean if_public;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
