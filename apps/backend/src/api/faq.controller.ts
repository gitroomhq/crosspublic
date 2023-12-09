import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {AnsweredQuestion, MessagesListValidator, OnlyMessagesList} from "@crosspublic/validators/src/messages/messages.list.validator";
import {JobsService} from "@crosspublic/database/src/jobs/jobs.service";
import {IdStringValidator} from "@crosspublic/validators/src/general/id.string.validator";
import {GeneratorService} from "@crosspublic/backend/src/services/generator.service";
import {CheckPolicies} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {CreateFaqValidator} from "@crosspublic/validators/src/faq/create.faq.validator";
import {FaqService} from "@crosspublic/database/src/faq/faq.service";
import {OrderValidator} from "@crosspublic/validators/src/general/order.validator";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import extract from 'extract-json-from-string';
import {CategoryStringValidator} from "@crosspublic/validators/src/general/category.string.validator";
import {Revalidate} from "@crosspublic/backend/src/services/revalidate";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Faq')
@Controller('/faq')
@ApiHeaders([{name: 'auth', required: true}])
export class FaqController {
  constructor(
    private _jobsService: JobsService,
    private _generatorService: GeneratorService,
    private _faqService: FaqService,
  ) {
  }

  @Revalidate()
  @Delete('/:id')
  async deleteFaq(
    @GetUserFromRequest() user: UserInterface,
    @Param() body: IdStringValidator
  ) {
    return this._faqService.deleteFaq(user.organization.organizationId, body.id);
  }

  @CheckPolicies([AuthorizationActions.Read, Sections.FAQ])
  @Get('/:id')
  getFaq(
    @GetUserFromRequest() user: UserInterface,
    @Param() params: IdStringValidator,
  ) {
    return this._faqService.getFaqById(user.organization.organizationId, params.id);
  }

  @Revalidate()
  @CheckPolicies([AuthorizationActions.Update, Sections.FAQ])
  @Post('/order')
  orderFaqs(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: OrderValidator
  ) {
    return this._faqService.updateFaqOrder(user.organization.organizationId, body);
  }

  @Revalidate()
  @CheckPolicies([AuthorizationActions.Update, Sections.FAQ])
  @Put('/:id/category/:category')
  async changeFaqCategory(
    @GetUserFromRequest() user: UserInterface,
    @Param() params: CategoryStringValidator,
  ) {
    return this._faqService.changeFaqCategory(user.organization.organizationId, params.id, params.category);
  }

  @Revalidate()
  @CheckPolicies([AuthorizationActions.Create, Sections.FAQ])
  @Post('/')
  async createFaq(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: CreateFaqValidator
  ) {
    return this._faqService.createFaq(user.organization.organizationId, body);
  }

  @Revalidate()
  @CheckPolicies([AuthorizationActions.Update, Sections.FAQ])
  @Put('/:id')
  async updateFaq(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: CreateFaqValidator,
    @Param() params: IdStringValidator,
  ) {
    return this._faqService.updateFaq(user.organization.organizationId, params.id, body);
  }

  @Post('/job')
  async createJob(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: MessagesListValidator
  ) {
    const {id} = await this._jobsService.insertJob(user.organization.organizationId, body.reference, body.messagesList);
    const url = process.env.FRONTEND_URL + `/job/${id}`;
    return {url};
  }

  @CheckPolicies([AuthorizationActions.Read, Sections.FAQ])
  @Post('/jobs/questions')
  async getJobQuestions(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: OnlyMessagesList
  ) {
    const FAQ = await this._generatorService.create([{
        role: 'user',
        prompt: `
I have a conversation about a problem.
Can you extract all the questions that are being asked in the conversation to an "faq" type question?
Break everything into multiple questions in the following format:
[{"question": "string"}]
{{conversation}}
`,
      variables: {
        conversation: body.messagesList.map(p => `${p.name}: ${p.message}`).join('\n')
      }
    }]);

    return {
      questions: extract(FAQ.choices[0].message.content)[0]
    }
  }

  @Post('/answers')
  async getJobAnswers(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: AnsweredQuestion
  ) {
      const text = await this._generatorService.create([{
          prompt: `
I have a conversation that answer many questions, can you extract only the text that answer the question: "{{question}}"
Write as much content as you can including code snippets and links.
Here is the conversation:
{{conversation}}
`,
          role: 'user',
          variables: {
              question: body.question,
              conversation: body.messagesList.map(p => `${p.name}: ${p.message}`).join('\n'),
          }
      }]);

    const answer = await this._generatorService.create([
        {
            role: 'system',
            prompt: `
You are a system that writes FAQs content only based on "title" and "text"
This is what you do:
    - Make to content fit MD format
    - Don't put h1 titles
    - Answer the question of the "title" only
    - Use a very simple english words
    - Don't write Q: and A:
This is what you don't do:
    - Mention the users in the conversation.
`,
            variables: {}
        },
        {
          role: 'user',
          prompt: `
"title": "{{title}}"
"text": "{{text}}"
`,
          variables: {
            text: text.choices[0].message.content
          }
        }
    ], {
        title: body.question
    });

    const removeLine = answer.choices[0].message.content.replace(/(?<![0-9])\. (?=[A-Z])/g, `.

`).split('\n').filter(p => !p.includes(body.question)).join('\n');

    return {
      answer: removeLine
    };
  }

  @Get('/jobs/:id')
  getJobById(
    @GetUserFromRequest() user: UserInterface,
    @Param() body: IdStringValidator
  ) {
    return this._jobsService.getJobById(user.organization.organizationId, body.id);
  }
}
