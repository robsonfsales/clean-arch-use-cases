export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if(context === undefined || context === error.context)
                message += `${error.context}: ${error.message},`
        });
        return message;
    }

    // messages(context: string): string {
    //     return this.errors
    //         .filter((error) => error.context === context)
    //         .map((error) => error.message)
    //         .join(",");
    // }
}