import { Controller, Get, Query } from '@nestjs/common';
import { AppService, Question } from './app.service';

@Controller('questions')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getQuestions(@Query('limit') limit: string): Question[] {
        const count = parseInt(limit) || 10;
        return this.appService.getQuestions(count);
    }
}
