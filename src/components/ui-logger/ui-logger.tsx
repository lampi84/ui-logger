import { Component, Method, State, Prop } from '@stencil/core';

@Component({
  tag: 'ui-logger',
  styleUrl: 'ui-logger.css',
  shadow: true
})
export class UiLogger {

  @Prop()
  config = {
    validSeconds: 4
  }

  @State()
  logQueue: { type: string, message: string, timestamp: number }[] = [];

  constructor() {
    setInterval(() => {
      this.updateLog();
    }, 1000);
  }

  updateLog() {
    let timeThreshold = new Date().getTime() - (this.config.validSeconds * 1000);


    this.logQueue = this.logQueue.filter(logMessage => {
      return logMessage.timestamp > timeThreshold
    })

    console.log('Updated Log: ', this.logQueue);
  }

  @Method()
  addLogMessage(type: string, message: string) {
    this.logQueue = [{
      type,
      message,
      timestamp: new Date().getTime()
    }, ...this.logQueue];
    console.log(this.logQueue);
  }


  render() {
    return (<div class='logPanel'>
      {this.logQueue.map((logMessage) =>

        <div class={'logMessage ' + logMessage.type.toLowerCase()}>
          <div>{logMessage.message}</div>
        </div>
      )}

    </div>);
  }
}
