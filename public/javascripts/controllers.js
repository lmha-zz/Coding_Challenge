
sendHubApp.controller('contacts', ['$scope', '$http', 'ContactFactory', 'MessageFactory', function($scope, $http, ContactFactory, MessageFactory) {
  $scope.oneAtATime = true;
  $scope.editing = false;
  $scope.recipientID;
  $scope.recipient;
  $scope.recipientPhoneNumber;
  $scope.contactIndex;
  $scope.new_contact = {};

  $scope.newContact = function() {
    $scope.errors = '';
    ContactFactory.createContact($scope.new_contact,
      function(errs) {
        $scope.errors = errs;
      },
      function(contacts) {
        $scope.contacts = contacts;
      }
    );
    $scope.new_contact = null;
  }

  $scope.selectContact = function(contact, index) {
    $scope.msgStatus = '';
    $scope.messageError = [];
    $scope.contactIndex = index;
    $scope.recipientID = contact.id_str;
    $scope.recipient = contact.name;
    $scope.recipientPhoneNumber = contact.number;
    $scope.new_contact.contact_name = contact.name;
    $scope.new_contact.phone_number = parseInt(contact.number);
    $scope.editing = true;
  }

  $scope.updateContact = function() {
    ContactFactory.updateContact(
      $scope.recipientID,
      $scope.new_contact,
      function(errs) {
        $scope.errors = errs;
      },
      function(contact) {
        $scope.contacts[$scope.contactIndex].name = contact.name;
      }
    );
  }

  $scope.cancelUpdate = function() {
    $scope.errors = '';
    $scope.new_contact = {};
    $scope.editing = false;
  }

  $scope.sendMessage = function() {
    $scope.messageError = [];
    $scope.msgStatus = '';
    if(!$scope.recipientPhoneNumber) {
      $scope.messageError.push("Please select a recipient from your contacts.");
    } else if($scope.new_message == undefined) {
      $scope.messageError.push("Cannot send an empty message.");
    } else {
      MessageFactory.createMessage($scope.recipientPhoneNumber, $scope.new_message,
        function(succ) {
          $scope.msgStatus = "Message sent.";
        }
      );
      $scope.new_message = null;
    }
  }

  ContactFactory.getContacts(function(contacts){
    $scope.contacts = contacts;
  });
}])