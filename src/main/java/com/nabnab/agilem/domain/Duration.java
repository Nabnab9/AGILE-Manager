package com.nabnab.agilem.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Durée de la tache, estimée et passée, pour le dev, le testeur ..
 * @author Nabnab
 */
@ApiModel(description = "Durée de la tache, estimée et passée, pour le dev, le testeur .. @author Nabnab")
@Entity
@Table(name = "duration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Duration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "estimated")
    private Float estimated;

    @Column(name = "spent")
    private Float spent;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    private Task task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getEstimated() {
        return estimated;
    }

    public Duration estimated(Float estimated) {
        this.estimated = estimated;
        return this;
    }

    public void setEstimated(Float estimated) {
        this.estimated = estimated;
    }

    public Float getSpent() {
        return spent;
    }

    public Duration spent(Float spent) {
        this.spent = spent;
        return this;
    }

    public void setSpent(Float spent) {
        this.spent = spent;
    }

    public String getName() {
        return name;
    }

    public Duration name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Task getTask() {
        return task;
    }

    public Duration task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Duration duration = (Duration) o;
        if (duration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), duration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Duration{" +
            "id=" + getId() +
            ", estimated=" + getEstimated() +
            ", spent=" + getSpent() +
            ", name='" + getName() + "'" +
            "}";
    }
}
