package ua.ferret.crud.controller;

import static java.util.Objects.nonNull;
import static org.springframework.data.domain.Sort.Direction.DESC;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import ua.ferret.crud.model.Message;
import ua.ferret.crud.repos.MessageRepository;
import ua.ferret.crud.service.SimpService;

@CrossOrigin
@RestController
@RequestMapping("api")
public class MessageController {

	private @Autowired SimpService simp;
	private @Autowired MessageRepository repository;

	@GetMapping("list")
	public Object list(@PageableDefault(sort = "id", direction = DESC) Pageable pageable, HttpServletRequest request) {
		var map = new HashMap<>(3);
		var page = repository.findAll(pageable);
		map.put("content", page.getContent());
		map.put("first", page.isFirst());
		map.put("last", page.isLast());
		return map;
	}

	@GetMapping("read/{id}")
	public Object read(@PathVariable long id) {
		return ResponseEntity.of(repository.findById(id));
	}

	@PostMapping("create")
	public void create(@RequestBody Message message) {
		Assert.hasText(message.getTitle(), "The title cannot be empty");
		Assert.hasText(message.getContent(), "The content cannot be empty");
		simp.create(repository.save(message));
	}

	@PutMapping("update/{id}")
	public void update(@PathVariable long id, @RequestParam("title") String title, @RequestParam("content") String content) {
		Assert.hasText(title, "Data to update not specified [title]");
		Assert.hasText(content, "The content cannot be empty [content]");
		var message = repository.findById(id).filter(value -> {
			var update = false;

			if (nonNull(title) && !title.equals(value.getTitle())) {
				value.setTitle(title);
				update = true;
			}

			if (nonNull(content) && !content.equals(value.getContent())) {
				value.setContent(content);
				update = true;
			}

			return update;
		});
		message.ifPresent(repository::save);
		message.ifPresent(simp::update);
	}

	@DeleteMapping("delete/{id}")
	public void delete(@PathVariable long id) {
		var message = repository.findById(id);
		message.ifPresent(repository::delete);
		message.ifPresent(simp::delete);
	}

}