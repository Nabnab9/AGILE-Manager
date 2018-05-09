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
 * La task est l'élément atomique du dev
 * @author Nabnab
 */
@ApiModel(description = "La task est l'élément atomique du dev @author Nabnab")
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "title", nullable = false)
    private String title;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @NotNull
    @Column(name = "jhi_order", nullable = false)
    private Integer order;

    @ManyToOne
    private TaskList taskList;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "task_user_extra",
               joinColumns = @JoinColumn(name="tasks_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="user_extras_id", referencedColumnName="id"))
    private Set<UserExtra> userExtras = new HashSet<>();

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Duration> durations = new HashSet<>();

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TagList> tagLists = new HashSet<>();

    @OneToMany(mappedBy = "task")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CheckList> checkLists = new HashSet<>();

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

    public Task title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrder() {
        return order;
    }

    public Task order(Integer order) {
        this.order = order;
        return this;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public TaskList getTaskList() {
        return taskList;
    }

    public Task taskList(TaskList taskList) {
        this.taskList = taskList;
        return this;
    }

    public void setTaskList(TaskList taskList) {
        this.taskList = taskList;
    }

    public Set<UserExtra> getUserExtras() {
        return userExtras;
    }

    public Task userExtras(Set<UserExtra> userExtras) {
        this.userExtras = userExtras;
        return this;
    }

    public Task addUserExtra(UserExtra userExtra) {
        this.userExtras.add(userExtra);
        userExtra.getTasks().add(this);
        return this;
    }

    public Task removeUserExtra(UserExtra userExtra) {
        this.userExtras.remove(userExtra);
        userExtra.getTasks().remove(this);
        return this;
    }

    public void setUserExtras(Set<UserExtra> userExtras) {
        this.userExtras = userExtras;
    }

    public Set<Duration> getDurations() {
        return durations;
    }

    public Task durations(Set<Duration> durations) {
        this.durations = durations;
        return this;
    }

    public Task addDuration(Duration duration) {
        this.durations.add(duration);
        duration.setTask(this);
        return this;
    }

    public Task removeDuration(Duration duration) {
        this.durations.remove(duration);
        duration.setTask(null);
        return this;
    }

    public void setDurations(Set<Duration> durations) {
        this.durations = durations;
    }

    public Set<TagList> getTagLists() {
        return tagLists;
    }

    public Task tagLists(Set<TagList> tagLists) {
        this.tagLists = tagLists;
        return this;
    }

    public Task addTagList(TagList tagList) {
        this.tagLists.add(tagList);
        tagList.setTask(this);
        return this;
    }

    public Task removeTagList(TagList tagList) {
        this.tagLists.remove(tagList);
        tagList.setTask(null);
        return this;
    }

    public void setTagLists(Set<TagList> tagLists) {
        this.tagLists = tagLists;
    }

    public Set<CheckList> getCheckLists() {
        return checkLists;
    }

    public Task checkLists(Set<CheckList> checkLists) {
        this.checkLists = checkLists;
        return this;
    }

    public Task addCheckList(CheckList checkList) {
        this.checkLists.add(checkList);
        checkList.setTask(this);
        return this;
    }

    public Task removeCheckList(CheckList checkList) {
        this.checkLists.remove(checkList);
        checkList.setTask(null);
        return this;
    }

    public void setCheckLists(Set<CheckList> checkLists) {
        this.checkLists = checkLists;
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
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
