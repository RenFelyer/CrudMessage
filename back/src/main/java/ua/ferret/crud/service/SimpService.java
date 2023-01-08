package ua.ferret.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import ua.ferret.crud.model.Message;

@Service
public class SimpService {

	private @Autowired SimpMessagingTemplate simp;

	public void create(Message message) {
		simp.convertAndSend("/message/create", message);
	}

	public void update(Message message) {
		simp.convertAndSend("/message/update", message);
	}

	public void delete(Message message) {
		simp.convertAndSend("/message/delete", message.getId());
	}

}
