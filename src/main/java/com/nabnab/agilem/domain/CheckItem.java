package com.nabnab.agilem.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Les checks de la liste de checks
 * @author Nabnab
 */
@ApiModel(description = "Les checks de la liste de checks @author Nabnab")
@Entity
@Table(name = "check_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CheckItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_label", nullable = false)
    private String label;

    @NotNull
    @Column(name = "checked", nullable = false)
    private Boolean checked;

    @ManyToOne
    private CheckList checkList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public CheckItem label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean isChecked() {
        return checked;
    }

    public CheckItem checked(Boolean checked) {
        this.checked = checked;
        return this;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public CheckList getCheckList() {
        return checkList;
    }

    public CheckItem checkList(CheckList checkList) {
        this.checkList = checkList;
        return this;
    }

    public void setCheckList(CheckList checkList) {
        this.checkList = checkList;
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
        CheckItem checkItem = (CheckItem) o;
        if (checkItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), checkItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CheckItem{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", checked='" + isChecked() + "'" +
            "}";
    }
}
