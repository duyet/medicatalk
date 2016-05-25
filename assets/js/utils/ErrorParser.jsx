define([], function () {
	return (payload, html = true) => {
		let message = []
        const default_message = 'something went wrong'
        // if (!payload.data) return payload.message || default_message
        
        const data = payload.data
        // if (!data.invalidAttributes) return data.summary || default_message
        
        for (let i in data.invalidAttributes) {
            let attr = data.invalidAttributes[i]
            for (let j in attr) {
                if (attr[j].rule == 'alphanumericdashed') message.push('Validate fail')
                else message.push(attr[j].message)
            }
        }
        
        return message
	}
})