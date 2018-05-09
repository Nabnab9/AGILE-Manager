package com.nabnab.agilem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Bah une liste de checks
 * @author Nabnab
 */
@ApiModel(description = "Bah une liste de checks @author Nabnab")
@Entity
@Table(name = "check_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CheckList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    private Task task;

    @OneToMany(mappedBy = "checkList")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CheckItem> checkItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public CheckList title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Task getTask() {
        return task;
    }

    public CheckList task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Set<CheckItem> getCheckItems() {
        return checkItems;
    }

    public CheckList checkItems(Set<CheckItem> checkItems) {
        this.checkItems = checkItems;
        return this;
    }

    public CheckList addCheckItem(CheckItem checkItem) {
        this.checkItems.add(checkItem);
        checkItem.setCheckList(this);
        return this;
    }

    public CheckList removeCheckItem(CheckItem checkItem) {
        this.checkItems.remove(checkItem);
        checkItem.setCheckList(null);
        return this;
    }

    public void setCheckItems(Set<CheckItem> checkItems) {
        this.checkItems = checkItems;
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
        CheckList checkList = (CheckList) o;
        if (checkList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), checkList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CheckList{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
