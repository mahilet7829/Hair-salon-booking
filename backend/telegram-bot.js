require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const managerChatId = process.env.MANAGER_CHAT_ID;

// Don't exit if no token - just warn
if (!token || token === 'test12345') {
  console.log('⚠️ Telegram bot not configured. Set TELEGRAM_BOT_TOKEN in .env to enable.');
}

let bot = null;
if (token && token !== 'test12345') {
  bot = new TelegramBot(token, { polling: true });
  console.log('🤖 Telegram bot is running...');
} else {
  console.log('🤖 Telegram bot disabled (no valid token)');
}

// Function to send notification to manager
function notifyManager(bookingDetails) {
  if (!bot || !managerChatId) {
    console.log('📝 Booking saved (Telegram not configured):', bookingDetails.customer_name);
    return;
  }
  
  let message = `🔔 *NEW BOOKING*\n\n`;
  message += `👤 *Customer:* ${bookingDetails.customer_name}\n`;
  message += `📞 *Phone:* ${bookingDetails.customer_phone}\n`;
  message += `💇 *Service:* ${bookingDetails.service_name}\n`;
  message += `👩‍🦱 *Staff:* ${bookingDetails.staff_name}\n`;
  message += `⏰ *Time:* ${new Date(bookingDetails.start_time).toLocaleString()}\n`;
  
  if (bookingDetails.deposit_paid) {
    message += `💰 *Deposit:* ${bookingDetails.deposit_amount} ETB (PAID)\n`;
  } else {
    message += `💰 *Deposit:* Not paid (collect at arrival)\n`;
  }
  
  if (bookingDetails.notes) {
    message += `📝 *Notes:* ${bookingDetails.notes}\n`;
  }
  
  bot.sendMessage(managerChatId, message, { parse_mode: 'Markdown' }).catch(console.error);
}

module.exports = { notifyManager };