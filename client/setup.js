var bot = new ChatSDK({
  config: {
    navbar: {
      title: 'Oreo',
    },
    robot: {
      avatar: 'https://oss01-zb01-hz-external.test.geely.com/jpgs-shopfile/c5a564d68f9d497c9cb71889b9f73797头像.jpeg',
    },
    messages: [
      {
        type: 'text',
        content: {
          text: 'Oreo is at your service. What can I do for you?',
        },
      },
    ],
  },
  requests: {
    send: async function (msg) {
      if (msg.type === 'text') {
        return {
          type: 'text',
          content: {
            text: (await nlp.process('en', msg.content.text)).answer,
          },
        }
      }
    },
  },
  handlers: {
    parseResponse: function (res, requestType) {
      if (requestType === 'send' && res.Messages) {
        // 解析 ISV 消息数据
        return isvParser({ data: res })
      }
      return res
    },
  },
})

bot.run()
