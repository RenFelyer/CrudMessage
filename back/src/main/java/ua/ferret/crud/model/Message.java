package ua.ferret.crud.model;

import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.TemporalType.DATE;

import java.time.LocalDate;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;

@Entity
public class Message {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private long id;
	private @Column(nullable = false) String title;
	private @Column(nullable = false) String content;

	@Temporal(DATE)
	@CreationTimestamp
	private LocalDate created;

	@Temporal(DATE)
	@UpdateTimestamp
	private LocalDate updated;


	public void setTitle(String title) { this.title = title; }
	public void setContent(String content) {this.content = content;}

	public long getId() {return id;}
	public String getTitle() { return title; }
	public String getContent() {return content;}
	public LocalDate getCreated() { return created; }
	public LocalDate getUpdated() { return updated; }

	public boolean isEdit() {
		return !created.isEqual(updated);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, title, content, updated, created);
	}
	
	@Override
	public boolean equals(Object obj) {
		return obj instanceof Message ? equals((Message) obj) : false;
	}
	
	private boolean equals(Message mess) {
		return mess.id == id && mess.title == title && mess.content == content && created.isEqual(mess.created) && updated.isEqual(mess.updated);
	}
	
	
}
