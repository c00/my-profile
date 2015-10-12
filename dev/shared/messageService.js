(function(){ 
	ndtApp.service("messageService", messageService);

	function messageService($http, settings, $q, Notification){
		var self = this;
		self.getConversations = getConversations;
		self.getMessages = getMessages;
		self.sendMessage = sendMessage;

		function getMessages(conversationId){
			var q = $q.defer();

			//Get messages
			$http.get(settings.apiBase + 'chat/conversation/' + conversationId).then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("Couldn't get your messages. Try again or report this error.");
					q.reject(error);
				});

			return q.promise;
		}

		function getConversations(){
			var q = $q.defer();

			$http.get(settings.apiBase + 'nextdoorteacher/chat/conversations').then(
				function(result){
					q.resolve(result.data);
				},
				function(error){
					Notification.error("I can't reach your conversations right now. Try again later or report this error.");
					q.reject(error);
				});

			return q.promise;
		}

		function sendMessage(message){
			var q = $q.defer();
			//Send message
			$http.post(settings.apiBase + 'chat/message', message).then(
				function(result){	
					q.resolve(result.data);
				},
				function(error){
					Notification.error("I didn't sent that message. Please try again, or report this problem.");
					q.reject(error);
				});

			return q.promise;
		}

	}
})();