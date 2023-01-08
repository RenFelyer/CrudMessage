package ua.ferret.crud.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import ua.ferret.crud.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

	Page<Message> findAll(Pageable pageable);
}
