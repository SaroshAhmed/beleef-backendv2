// whatsappService.js
const wa = require('@open-wa/wa-automate');
let client;
let clientCreationPromise;
let lastQRCode = null; 
let lastCreatedGroupId; 

// Start WhatsApp client
const startWhatsAppClient = async () => {
  if (!client && !clientCreationPromise) {
    clientCreationPromise = wa.create({
      sessionId: 'MySession',
      multiDevice: true,
      headless: true,
      qrTimeout: 0,
      useChrome: false,
      screenshot: false,
      logConsole: false,
      qrCallback: (qrCode) => {
      
        lastQRCode = qrCode;
        console.log("QR code received and saved");
      },
    }).then((waClient) => {
      client = waClient;
      console.log("WhatsApp client started");
      return client;
    }).catch((error) => {
      console.error("Failed to start WhatsApp client:", error);
      clientCreationPromise = null;
      throw error;
    });
  }
  return clientCreationPromise;
};

// Create WhatsApp Group
const createWhatsAppGroup = async (groupName, participants) => {
  await startWhatsAppClient();
  try {
    if (!participants || participants.length === 0) {
      throw new Error("At least one participant is required.");
    }

    const formattedParticipants = participants.map(number => `${number}@c.us`);
    const initialMember = formattedParticipants[0];
    const additionalMembers = formattedParticipants.slice(1);


    const groupInfo = await client.createGroup(groupName, [initialMember]);
    const groupId = groupInfo.gid ? groupInfo.gid._serialized : groupInfo._serialized;
    console.log(`Group ${groupName} created with ID: ${groupId}`);

    lastCreatedGroupId = groupId;

    await new Promise(resolve => setTimeout(resolve, 5000));

    for (const [index, member] of additionalMembers.entries()) {
      await new Promise(resolve => setTimeout(resolve, index * 3000)); 
      try {
        await client.addParticipant(groupId, member);
        console.log(`Successfully added ${member}`);
      } catch (error) {
        console.error(`Error adding ${member}:`, error);
      }
    }

    await client.sendText(groupId, 'Hi Team, Welcome! We have created this group to ensure smooth communication. Looking forward to achieving the maximum outcome. Regards, Sandy');
    
    return { message: "Group created successfully", groupId };
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

const sendMessageToGroup = async (groupId, message) => {
  await startWhatsAppClient();


  const targetGroupId = groupId || lastCreatedGroupId;
  
  if (!targetGroupId) {
    throw new Error("No groupId provided and no group has been created yet.");
  }

  try {
    await client.sendText(targetGroupId, message);
    console.log(`Message sent to group ${targetGroupId}: ${message}`);
    return { message: "Message sent successfully" };
  } catch (error) {
    console.error(`Error sending message to group ${targetGroupId}:`, error);
    throw error;
  }
};

const getQRCode = () => lastQRCode;

module.exports = { createWhatsAppGroup, sendMessageToGroup, startWhatsAppClient, getQRCode };
